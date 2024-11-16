const { PrismaClient } = require('@prisma/client');

module.exports = async () => {
    const prisma = new PrismaClient();
    const count = await prisma.asset.count();
    if (count == 0) {
        var content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet orci vel lectus malesuada pretium. Etiam ornare, ligula a convallis vulputate, felis nulla cursus neque, nec feugiat urna nulla id metus. Aenean in sem at magna sodales efficitur. Cras sollicitudin tincidunt nisl, at pretium nisl tincidunt sit amet. Sed volutpat nisi sed suscipit pretium. Integer tincidunt feugiat mauris. Nulla facilisi. Vivamus egestas auctor dolor sed tincidunt. Suspendisse consectetur et sem id feugiat.

Pellentesque ac fringilla dolor. Nullam fringilla velit quis augue tincidunt, vitae convallis felis sodales. Donec venenatis turpis nec lorem suscipit, ut sollicitudin ipsum malesuada. Integer suscipit risus risus, a aliquet odio vestibulum vitae. Mauris tempus purus et felis facilisis, id interdum dui vehicula. Nulla id ante mauris. Fusce in dolor eget odio luctus sodales ac sit amet est. Sed sit amet lorem eget purus consectetur egestas et nec velit.

Ut volutpat feugiat nulla, eu varius elit elementum ut. Aenean sodales purus id eros lobortis, nec mollis ligula ultricies. Etiam tincidunt, nunc sit amet dignissim vulputate, arcu risus efficitur orci, vel fringilla risus sem eget nulla. Nulla facilisi. Mauris faucibus gravida lectus, id aliquam libero feugiat et. Sed feugiat erat ac neque suscipit, a volutpat velit posuere. Suspendisse et est vel metus porttitor porttitor. Fusce malesuada lacinia mi, ac tristique nisl bibendum eget. Nunc sodales, ante ac maximus vulputate, augue risus mollis ligula, at pretium nulla dui sed ante.

Cras sed orci et elit feugiat tincidunt. Nunc pretium neque risus, sit amet viverra leo sollicitudin sed. Suspendisse feugiat, augue non placerat gravida, nisi sapien interdum sem, euismod mollis sapien erat eget lorem. Nam ac sapien et nulla volutpat tincidunt non sit amet ante. Pellentesque vitae magna quis justo tincidunt tristique. Integer scelerisque ac nunc eget bibendum. Donec condimentum augue vitae convallis condimentum. Nulla facilisi. Nunc at justo orci. Mauris placerat ante id magna cursus, vitae aliquet mi auctor.

Curabitur posuere augue sit amet justo elementum lacinia. Nunc vel nisi eget lorem tincidunt interdum. Phasellus ac dolor eu nulla feugiat congue. Morbi faucibus maximus purus, sit amet finibus justo sollicitudin id. Nam id libero eros. Morbi gravida pharetra orci, eget gravida erat pretium ac. Proin scelerisque risus est. Quisque lacinia placerat neque ut vehicula. Cras euismod, velit id tincidunt dictum, ante tortor accumsan libero, ut tincidunt turpis libero vitae ipsum. Suspendisse vehicula risus ac tortor aliquet, id cursus libero sollicitudin. In sit amet justo vel purus porttitor laoreet. Aliquam sit amet orci feugiat, posuere nunc a, lacinia enim. Sed in felis sed urna vehicula euismod.

Nunc euismod ipsum non odio rhoncus, eget sodales lectus efficitur. Nulla dictum mi ac metus lacinia, vitae tincidunt elit faucibus. In euismod felis eget dui auctor, vitae fermentum eros lacinia. Donec suscipit condimentum dolor, non lobortis neque. Donec quis ante at dui auctor scelerisque. Morbi convallis ex vel purus fermentum, id mollis dolor vulputate. Ut placerat turpis a convallis volutpat. Nunc faucibus auctor ante non vestibulum. Cras vestibulum ante vel purus laoreet, vitae aliquet nisl aliquam. Nulla laoreet orci eget odio malesuada, non laoreet metus auctor.

Sed et risus vestibulum, volutpat metus ut, varius libero. Vestibulum nec pharetra risus. Fusce sodales ac elit eget tempor. Suspendisse ut magna ante. Nam rhoncus et ligula vel blandit. Mauris sed est neque. Curabitur interdum, neque et cursus tempus, lorem ipsum scelerisque turpis, nec tincidunt lorem magna nec dui. Aliquam vulputate odio in risus tristique, ac maximus purus placerat. In gravida viverra bibendum. Curabitur vehicula ligula sed arcu maximus, sed auctor urna consectetur. Morbi sit amet viverra justo. Etiam at nunc at lacus auctor fermentum sit amet ac erat.

Aenean suscipit volutpat malesuada. Cras sed ultricies mi, in facilisis libero. Curabitur ac orci justo. Nam interdum suscipit orci a efficitur. Proin tempor purus vitae viverra varius. Ut a cursus orci, ac varius sapien. Donec viverra quam at nisi feugiat, ac tempus lectus malesuada. Integer sollicitudin, ex ut tincidunt varius, ligula elit auctor purus, ac tristique eros neque sed ante. Sed aliquam posuere libero at pharetra. Fusce faucibus est a efficitur congue. In id varius nulla.`;
        content = content.replace(/\n/g, '<br/>');
        const thumbnail = 'http://localhost:3000/lorem_ipsum.png';
        const contentVideo = `http://localhost:3000/video_example.mp4`;
        await prisma.asset.createMany({
            data: [
                {
                    title: 'Lorem Ipsum Article 1',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Article 2',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Article 3',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Article 4',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Article 5',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Article 6',
                    thumbnail,
                    content,
                    is_video: false
                },
                {
                    title: 'Lorem Ipsum Video 1',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
                {
                    title: 'Lorem Ipsum Video 2',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
                {
                    title: 'Lorem Ipsum Video 3',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
                {
                    title: 'Lorem Ipsum Video 4',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
                {
                    title: 'Lorem Ipsum Video 5',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
                {
                    title: 'Lorem Ipsum Video 6',
                    thumbnail,
                    content: contentVideo,
                    is_video: true
                },
            ]
        });
    }
};