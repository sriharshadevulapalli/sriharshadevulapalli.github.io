// console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

gsap.registerPlugin(ScrollTrigger)


function initScrub(videoId) {
    gsap.utils.toArray('.step').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                scrub: i * 0.2
            },
            x: '400px'
        });
    });
}

initScrub("#video1")
initScrub("#video2")

