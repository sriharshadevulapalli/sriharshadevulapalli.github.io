// console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

gsap.registerPlugin(ScrollTrigger)


function initScrub(videoId) {
    let video = document.querySelector(videoId)
    let src = video.currentSrc || video.src;
    // console.log(video, src);
    // Scroll control
    const videoScrub = gsap.timeline({
        onUpdate: () => {
            
        console.log(videoScrub.progress().toFixed(2))
            
        },
        // currentTime: video.duration,
        scrollTrigger: {
            trigger: video.parentElement.parentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: false,
            pinSpacing: false,
        },
    })
    
    document.documentElement.addEventListener("touchstart", () => {
        video.play()
        video.pause()
    }, { once: true })

    // Make sure the video has loaded
    video.addEventListener("loadedmetadata", () => {
        videoScrub.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 })
    }, { once: true })

    /* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
    setTimeout(function () {
        if (window["fetch"]) {
            fetch(src)
                .then(response => response.blob())
                .then(response => {
                    var blobURL = URL.createObjectURL(response)

                    var t = video.currentTime
                    document.documentElement.addEventListener("touchstart", () => {
                        video.play()
                        video.pause()
                    }, { once: true })
                    video.setAttribute("src", blobURL)
                    video.currentTime = t + 0.001
                })
        }
    }, 1000)
}

initScrub("#video1")
initScrub("#video2")

