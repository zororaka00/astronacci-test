const { PrismaClient } = require('@prisma/client');

const { SecurityHelper } = require('../../helper');

const limit_asset = [
    {
        type: 'TYPE_A',
        article: '3',
        video: '3'
    },
    {
        type: 'TYPE_B',
        article: '10',
        video: '10'
    },
    {
        type: 'TYPE_C',
        article: 'Unlimited',
        video: 'Unlimited'
    }
];

module.exports = class {
    async dashboard(req, res, tokenAuth) {
        try {
            const security = new SecurityHelper();
            const prisma = new PrismaClient();
            const payload = security.verifyJwt(tokenAuth);
            if (payload) {
                const getCredential = await prisma.credential.findFirst({
                    where: {
                        userId: payload.id
                    },
                    select: {
                        token_hash: true
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                });
                const tokenHashByPayload = security.hash(payload.token);
                if (getCredential && getCredential.token_hash == tokenHashByPayload) {
                    const allData = await Promise.all([
                        await prisma.user.findUnique({
                            where: {
                                id: payload.id
                            }
                        }),
                        await prisma.asset.findMany({
                            orderBy: {
                                created_at: 'desc'
                            },
                            select: {
                                id: true,
                                title: true,
                                thumbnail: true,
                                content: true,
                                is_video: true
                            }
                        }),
                        await prisma.history.findMany({
                            where: {
                                userId: payload.id
                            }
                        }),
                    ]);
                    const dataAsset = await allData[1].map(data => {
                        const is_pick = allData[2].findIndex(findData => findData.assetId == data.id);
                        return { ...data, is_pick: is_pick >= 0 };
                    });
                    const getLimit = limit_asset.find(findData => allData[0].permission == findData.type);
                    res.render('dashboard/index', {
                        user: {
                            id: payload.id,
                            email: allData[0].email,
                            full_name: allData[0].full_name,
                            profile_picture: allData[0].profile_picture,
                            permission: allData[0].permission,
                            limit_asset: getLimit
                        },
                        data_asset: dataAsset,
                        access_limit_asset: {
                            article: (await allData[2].filter(filterData => !filterData.is_video)).length,
                            video: (await allData[2].filter(filterData => filterData.is_video)).length
                        }
                    });
                } else {
                    req.session.token = null;   
                    res.redirect('../');
                }
            } else {
                req.session.token = null;
                res.redirect('../');
            }
        } catch (error) {
            req.session.token = null;
            res.redirect('../');
        }
    }

    async detailContent(req, res, tokenAuth, assetId) {
        try {
            const security = new SecurityHelper();
            const prisma = new PrismaClient();
            const payload = security.verifyJwt(tokenAuth);
            if (payload) {
                const getCredential = await prisma.credential.findFirst({
                    where: {
                        userId: payload.id
                    },
                    orderBy: {
                        created_at: 'desc'
                    },
                    include: {
                        user: true
                    },
                });
                const tokenHashByPayload = security.hash(payload.token);
                if (getCredential && getCredential.token_hash == tokenHashByPayload) {
                    var isNext = true;
                    const getLimit = limit_asset.find(findData => getCredential.user.permission == findData.type);
                    var remainingLimitArticle = getLimit.article;
                    var remainingLimitVideo = getLimit.video;
                    if (getLimit && getLimit.type != 'TYPE_C') {
                        const countsAccess = await Promise.all([
                            await prisma.history.count({ // access article
                                where: {
                                    userId: getCredential.user.id,
                                    is_video: false
                                }
                            }),
                            await prisma.history.count({ // access video
                                where: {
                                    userId: getCredential.user.id,
                                    is_video: true
                                }
                            })
                        ]);
                        isNext = countsAccess[0] <= getLimit.article && countsAccess[1] <= getLimit.video;
                        remainingLimitArticle -= countsAccess[0];
                        remainingLimitVideo -= countsAccess[1];
                    }
                    const getAsset = await prisma.asset.findFirst({
                        where: {
                            id: assetId
                        }
                    });
                    const getHistory = await prisma.history.findFirst({
                        where: {
                            userId: getCredential.user.id,
                            assetId
                        },
                    });
                    if (!getHistory) {
                        if (getLimit.type == 'TYPE_C' || (!getAsset.is_video && remainingLimitArticle > 0) ||
                        (getAsset.is_video && remainingLimitVideo > 0)) {
                            await prisma.history.create({
                                data: {
                                    userId: getCredential.user.id,
                                    assetId,
                                    is_video: getAsset.is_video
                                }
                            });
                        } else {
                            isNext = false;
                        }
                    } else {
                        isNext = true;
                    }
                    if (isNext) {
                        res.render('dashboard/index', {
                            user: {
                                id: payload.id,
                                email: getCredential.user.email,
                                full_name: getCredential.user.full_name,
                                profile_picture: getCredential.user.profile_picture,
                                permission: getCredential.user.permission,
                                limit_asset: limit_asset.find(findData => getCredential.user.permission == findData.type)
                            },
                            detail_asset: {
                                id: getAsset.id,
                                title: getAsset.title,
                                thumbnail: getAsset.thumbnail,
                                content: getAsset.content,
                                is_video: getAsset.is_video
                            }
                        });
                    } else {
                        res.redirect('./');
                    }
                } else {
                    req.session.token = null;
                    res.redirect('../');
                }
            } else {
                req.session.token = null;
                res.redirect('../');
            }
        } catch (error) {
            req.session.token = null;
            res.redirect('../');
        }
    }
}