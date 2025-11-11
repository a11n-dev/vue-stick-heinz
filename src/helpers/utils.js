/**
 * Insert initial songs params
 * @param {array} songs
 */

const threatSongs = songs => {

  return songs.map(song => {
    song["isPlaying"] = false;
    song["percent"] = 0;
    
    // src уже есть в моковых данных или будет пустым для треков без аудио
    if (!song.src) {
      song["src"] = '';
    }
    
    if (!song.srcDownload) {
      song["srcDownload"] = '';
    }

    // Обработка длительности - поддержка как формата "MM:SS" так и секунд
    if (song.length) {
      let msArr = song.length.split(':');
      song["seconds"] = (+msArr[0]) * 60 + (+msArr[1]);
    } else if (song.duration) {
      song["seconds"] = song.duration;
    } else {
      song["seconds"] = 0;
    }

    return song;
  });
};

export { threatSongs };
