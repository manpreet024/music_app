  var currentSongNumber = 1;
      var willLoop = 0;
      var willShuffle = 0; 
      $('.fa-repeat').on('click',function() {
      $('.fa-repeat').toggleClass('disabled')
      willLoop = 1 - willLoop;
      });
      function timeJump() { // f*n is used to reach at last of the song
      var song = document.querySelector('audio')
      song.currentTime = song.duration - 5;
       }
       function changeCurrentSongDetails(songObj) {
      $('.current-song-image').attr('src','img/' + songObj.image)
      $('.current-song-name').text(songObj.name)
      $('.current-song-album').text(songObj.album)
       }

        $('audio').on('ended',function() {
        var audio = document.querySelector('audio');
         if(willShuffle == 1) {
          var nextSongNumber = randomExcluded(1,6,currentSongNumber);
           var nextSongObj = songs[nextSongNumber -1];//this line actuAlly stores the current song in this object
           audio.src = nextSongObj.fileName;
           toggleSong(); 
           changeCurrentSongDetails(nextSongObj); // Update Image
           currentSongNumber = currentSongNumber; 
        // Play the next song
           }
        else if(currentSongNumber < 6){
          var nextSongObj = songs[currentSongNumber];
          audio.src = nextSongObj.fileName;
          toggleSong();
          changeCurrentSongDetails(nextSongObj);
          currentSongNumber = currentSongNumber + 1;
          }
        else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
        }
        else  {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
        }
       })
         //  $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          // audio.currentTime = 0;
           
        function toggleSong(){
         var song = document.querySelector('audio');
         if(song.paused == true){
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
         }
         else{
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
         }
         }
         $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if(name.length > 2) {
          var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
           }
          else {
           $('#name-input').addClass('error');
          }
          });
         $('.play-icon').on('click',function(){
          toggleSong();
          });

    //event part is the list of info we get from browser
      $('body').on('keypress',function(event) {
        var target = event.target;//here the target var is used to store the event which is done for the search bar
         if (event.keyCode == 32 && target.tagName != 'INPUT'){//here the space bar is no more play the song if event is occur in 'INPUT'i.e in search bar
              console.log(event);
              toggleSong();

           }
         });

  
          // thids f*n is  used for fancy time like minutes and seconds   
          function fancyTimeFormat(time)
        {   
         // Hours, minutes and seconds
         var hrs = ~~(time / 3600);
         var mins = ~~((time % 3600) / 60);
         var secs = time % 60;

         // Output like "1:01" or "4:03:59" or "123:03:59"
         var ret = "";
          if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
         }

         ret += "" + mins + ":" + (secs < 10 ? "0" : "");
         ret += "" + secs;
         return ret;
         }   

       //below f*n is used to show the time duration for playing song ,fancyTimeFormat is used to show the time in roundoff manner
    function updateCurrentTime() {
        var song = document.querySelector('audio');
        //console.log(song.currentTime);
        //console.log(song.duration);
        var currentTime = Math.floor(song.currentTime);
        currentTime = fancyTimeFormat(currentTime);
        var duration = Math.floor(song.duration);
        duration = fancyTimeFormat(duration);
        $('.time-elapsed').text(currentTime);
        $('.song-duration').text(duration);
        //console.log(song.currentTime);
        //console.log(song.duration);
       }
      //here we are showing the the songs in array form
       var songList = ['Badri Ki Dulhania (Title Track)','Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song','channa','tere to begair']; 
        var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3','song5.mp3','song6.mp3'];
           songList.length;
        var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi','satinder sartaaj','manjit Sahota'];
        var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil','the black prince','rocky mental movie'];
        var durationList = ['2:56','3:15','2:34','2:29','5:56','4:57'];
      //  var imageList = ['song1.jpg','song2.jpg','song3.jpg','song4.jpg','song5.jpg','song6.jpg'];

         function changeCurrentNameDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image)
        $('.current-song-name').text(songObj.name)
        $('.current-song-album').text(songObj.album)
        //$('.current-song-fileNames').text(songObj.fileNames)
        
        }

        //if condition is used  to search for the name of the file at 0 index
        //if the string(file)is found ,it gives the location of that string
       // otherwise gives -1
      function addSongNameClickEvent(songObj,position){
       var songName = songObj.fileName;
        var id = '#song' + position;
        $(id).click(function() {
          var audio = document.querySelector('audio');
          var currentSong = audio.src;
          if(currentSong.search(songName) != -1)
          {
          toggleSong();
           }
          else{
           // console.log('else statement executing');
          audio.src = songName;
          // changeCurrentNameDetails(songObj);
           toggleSong();
           changeCurrentNameDetails(songObj);//function call
           }
           });
           }
               //here we r creating an object (songs)and that single object is used  to store the details abt all songs..
            var songs = [{
             'name': 'Badri Ki Dulhania (Title Track)',
             'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
             'album': 'Badrinath ki Dulhania',
             'duration': '2:56',
             'fileName': 'song1.mp3',
             'image': 'song1.jpg'
            },
           {
           'name': 'Humma Song',
           'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
          'album': 'Ok Jaanu',
          'duration': '3:15',
          'fileName': 'song2.mp3',
          'image': 'song2.jpg'
           },
          {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
        },
        {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
         },
         {
        'name': 'channa',
        'artist': 'satinder sartaaj',
        'album': 'the black prince',
        'duration': '5:56',
        'fileName': 'song5.mp3',
        'image': 'song5.jpg'
       },
       {
        'name': 'tere to begair',
        'artist': 'manjit Sahota',
        'album': 'rocky mental movie',
        'duration': '4:57',
        'fileName': 'song6.mp3',
        'image': 'song6.jpg'
      }]
    
    
         
          for(var i =0; i < songs.length;i++) {
            //  addSongNameClickEvent(songList[i],i+1)
               var obj = songs[i];
               var name = '#song' + (i+1);
               var song = $(name);
              song.find('.song-name').text(songList[i]);
              song.find('.song-artist').text(artistList[i]);
              song.find('.song-album').text(albumList[i]); // Added
              song.find('.song-length').text(durationList[i]); 
           //   song.find('.song-image').text(imageList[i]); 
             addSongNameClickEvent(songList[i],i+1)
            } 
          
        //  window.onload = function(){
          //  changeCurrentSongDetails(songs[0]);
           $(document).ready(function(){

            for(var i =0; i < songs.length;i++) {
             var obj = songs[i];//no.of songs are stored in the variable obj 
             var name = '#song' + (i+1);
             var song = $(name);
           song.find('.song-name').text(obj.name);// obj is used to call  the song name
           song.find('.song-artist').text(obj.artist);//obj is used to call the artist name of  ths sog
           song.find('.song-album').text(obj.album); 
           song.find('.song-length').text(obj.duration);

       //    song.find('.song-length').text(Obj.fileNames,i+1);
           song.find('.song-image').text(obj.image);
           addSongNameClickEvent(obj,i+1)
           }

         // Added
      //   });

        
          updateCurrentTime();
       setInterval(function() {
       updateCurrentTime();
          },1000);
     });

      
      $('#songs').DataTable();
       paging: false
       


 
    