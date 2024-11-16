const { PrismaClient } = require('@prisma/client');

const { SecurityHelper } = require('../../helper');

module.exports = class {
    async login(req, res) {
      try {
        const dataUser = req.user;
        const ipAddress = req.ip ?? '';
        const security = new SecurityHelper();
        const prisma = new PrismaClient();
        const newToken = security.randomstring(24);
        const tokenHash = security.hash(newToken);
      
        const getUser = await prisma.user.upsert({
          where: {
            id: dataUser.id
          },
          update: {
            full_name: dataUser.displayName,
            profile_picture: dataUser.photos[0].value,
          },
          create: {
            id: dataUser.id,
            email: dataUser.emails[0].value,
            full_name: dataUser.displayName,
            profile_picture: dataUser.photos[0].value,
          }
        });
        await prisma.credential.create({
          data: {
            userId: getUser.id,
            token_hash: tokenHash,
            ip_address: ipAddress
          }
        });
        const tokenJwt = security.signJwt({
          id: getUser.id,
          token: newToken
        });
        
        req.session.token_login = tokenJwt;
        res.redirect(`/dashboard/`);
      } catch (error) {
        res.redirect('./');
      }
    }
}