
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const cd=$('.cd')
const heading=$('header h2')
const cdThumb=$('.cd-thumb')
const audio=$('#audio')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('#progress')
const preBtn=$('.btn-prev')
const nextBtn=$('.btn-next')
const randomBtn=$('.btn-random')
const repeatBtn=$('.btn-repeat')
const playlist=$('.playlist')
const app={
    
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    songs:[
        {
            name: 'Reality',
            singer: 'lost frequencies',
            path: './img&music/music/musicplayer1.mp3',
            image:'./img&music/img/img1.png'
        },
        {
            name: 'Phi điểu và ve sầu',
            singer: 'Nhậm Nhiên',
            path: './img&music/music/musicplayer2.mp3',
            image:'./img&music/img/img2.png'
        },
        {
            name: 'Đường ta chở em về',
            singer: 'Bùi Trương Linh',
            path: './img&music/music/musicplayer3.mp3',
            image:'./img&music/img/img3.png'
        },
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path: './img&music/music/musicplayer4.mp3',
            image:'./img&music/img/img4.png'
        },
        {
            name: 'Hoa nở không màu',
            singer: 'Hoài Lâm',
            path: './img&music/music/musicplayer5.mp3',
            image:'./img&music/img/img5.png'
        },
        {
            name: 'Dusk Till Dawn',
            singer: 'zayn,Sia',
            path: './img&music/music/musicplayer6.mp3',
            image:'./img&music/img/img6.png'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './img&music/music/musicplayer7.mp3',
            image:'./img&music/img/img7.png'
        },
        {
            name: 'Ta còn yêu nhau',
            singer: 'Đức phúc',
            path: './img&music/music/musicplayer8.mp3',
            image:'./img&music/img/img8.png'
        },
        {
            name: 'Đáp Án',
            singer: 'Luân Tang',
            path: './img&music/music/musicplayer9.mp3',
            image:'./img&music/img/img9.png'
        },
        {
            name: 'Nàng thơ',
            singer: 'Hoàng Dũng',
            path: './img&music/music/musicplayer10.mp3',
            image:'./img&music/img/img10.png'
        },
        {
            name: 'Sometime Just like this',
            singer: 'The Chainsmoker',
            path: './img&music/music/musicplayer11.mp3',
            image:'./img&music/img/img11.png'
        },
    ],
    render: function(){
        const htmls=this.songs.map((song,index) =>{
            return`
            <div class="song ${index === this.currentIndex ? 'active' : ' '}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`
        })
        playlist.innerHTML =htmls.join('')

    },
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })

    },
    handleEvent:function(){
        const _this=this
        const cdwidth=cd.offsetWidth
        //xử lí phóng to thu nhỏ khi scroll
        document.onscroll=function(){
            const scrollTop=window.scrollY||document.documentElement.scrollTop
            const newcdwidth=cdwidth-scrollTop
            cd.style.width=newcdwidth> 0 ? newcdwidth+'px':0
            cd.style.opacity=newcdwidth/cdwidth
        }
        //xử lí quay và dừng
        const cdThumbAnimate =cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity
        }
        )
        cdThumbAnimate.pause()

        //xử lí khi click play
        playBtn.onclick=function(){
            if(app.isPlaying){
                audio.pause()    
            }
            else{
                audio.play()    
            }
        }
        //Khi song play
        audio.onplay=function(){
            app.isPlaying=true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //khi song pause
        audio.onpause=function(){
            app.isPlaying=false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
         }
        //khi thời gian bài hát thay đổi
        audio.ontimeupdate=function(){
            if(audio.duration){
                 const progressPercent=Math.floor(audio.currentTime / audio.duration*100)
                 progress.value=progressPercent             
            }
        }
        //xử lí khi tua song
        progress.oninput=function(e){
            const seekTime=audio.duration/100*e.target.value
            audio.currentTime=seekTime
        }
        //xử lí khi next song
        nextBtn.onclick=function(){
            if(app.isRandom){
                app.playRadomSong()
            }else{
            app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        
    }
        //xu li khi prev songs
        preBtn.onclick=function(){
            if(app.isRandom){
                app.playRadomSong()
            }else{
           app.prevSong()
            }
           audio.play()
           app.render()
           app.scrollToActiveSong()
        }
        //xu li ramdon bat tat
        randomBtn.onclick=function(){
            app.isRandom=!app.isRandom
            randomBtn.classList.toggle('active',app.isRandom)
            
        }
        //xử lí next khi ended
        audio.onended=function(){
           if(app.isRepeat){
               audio.play()
           }
           else{
               nextBtn.click()
           }
        }
        //xu li lap lai
        repeatBtn.onclick=function(){
            app.isRepeat=!app.isRepeat
            repeatBtn.classList.toggle('active',app.isRepeat)
        }
        //lăng nghe clik playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
      
            if (songNode || e.target.closest(".option")) {
              // Xử lý khi click vào song
              // Handle when clicking on the song
              if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong();
                _this.render();
                audio.play();
              }
      
              // Xử lý khi click vào song option
              // Handle when clicking on the song option
              if (e.target.closest(".option")) {
              }
            }
          }

            
        
    },
    scrollToActiveSong:function(){
        setTimeout(() => {
            if(this.currentIndex<=2){
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'end'
                })
            }else{
                $('.song.active').scrollIntoView({
                    behavior:'smooth',
                    block:'center'
                })
            }
           
        }, 350);
    },
    loadCurrentSong: function(){
        heading.textContent=this.currentSong.name
        cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
        audio.src=this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length -1
        }
        this.loadCurrentSong()
    },
    playRadomSong: function(){
        let newIndex
        do{
            newIndex=Math.floor(Math.random()*this.songs.length)
        }while(newIndex===this.currentIndex)
        this.currentIndex=newIndex
        this.loadCurrentSong()

    },
   
    start : function(){
        // định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe/sử lí các sự kiện
        this.handleEvent()
        
         this.loadCurrentSong()

         

        //render Playlist
        this.render()
    }
    
}   
app.start()