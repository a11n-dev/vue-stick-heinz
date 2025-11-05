/**
 * API path
 */

const apiURL = process.env.VUE_APP_API_PATH;
export { apiURL }

/**
 * Insert initial songs params
 * @param {array} songs
 */

const threatSongs = songs => {

  return songs.map(song => {
    song["isPlaying"] = false;
    song["percent"] = 0;
    song["src"] = apiURL + '/api/release/download/' + song.id + '/preview';
    song["srcDownload"] = apiURL + '/api/release/download/' + song.id + '/release';

    let msArr = song.length.split(':');
    song["seconds"] = (+msArr[0]) * 60 + (+msArr[1]);

    return song;
  });
};

export { threatSongs };
