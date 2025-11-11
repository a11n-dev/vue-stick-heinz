/**
 * Insert initial songs params
 * @param {array} songs
 */

const threatSongs = songs => {

  return songs.map(song => {
    song["isPlaying"] = false;
    song["percent"] = 0;
    
    // src already exists in mock data or will be empty for tracks without audio
    if (!song.src) {
      song["src"] = '';
    }
    
    if (!song.srcDownload) {
      song["srcDownload"] = '';
    }

    // Duration handling - support both "MM:SS" format and seconds
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
