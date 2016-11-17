/* global VK */
import {addUser} from '../redux/modules/data';

class ApiClient {
  constructor(dispatch){
    this.dispatch = dispatch;
  }
  getSongsByOwnerId(owner_id, count = 0, captcha_sid, captcha_key) {
    return new Promise((resolve, reject)=> {
      //VK.Api.call('audio.get', {owner_id:17653538, count:999} , r => console.log(r))
      VK.Api.call('audio.get', { owner_id, count, captcha_sid, captcha_key }, r => {
        if (r.error) {

          // const {captcha_img,error_msg,captcha_sid} = r.error;
          // window.open(captcha_img, false, "width=200,height=100");;
          // const captcha_key = prompt('Please, enter captcha ' + error_msg);
          // this.getSongsByOwnerId(owner_id, 0, captcha_sid, captcha_key).then(()=> {
          //   resolve(r.response)
          // });
          //
        } else {
          resolve(r.response);
        }

      });
    })
  }

  getSongRequest(...args) {
    return () => {
      return this.getSongsByOwnerId(...args)
    }
  }

  login() {
    return new Promise((resolve, reject)=> {
      VK.Auth.login((r) => {
        if (r.error) {
          reject(r.error);
        }
        resolve(r.response);
      }, VK.access.AUDIO, VK.access.FRIENDS);
    })
  }


  createTimeout(delay = 400) {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve();
      }, delay);
    });
  }

  getUsersSongs(users, selectedSongs) {
    return new Promise((resolve, reject) => {
      const validUsers = [];
      const promises = users.map((user, i)=> {

        return () => {
          return this.createTimeout().then(() => {
            this.getSongsByOwnerId(user.uid).then((songs)=> {
              console.log(new Date());
              user.songs = songs;
              const matchedSongs = filterBySongs(songs, selectedSongs)
              console.log(`User ${user.uid} - ${matchedSongs}`);
              if (matchedSongs.length > 0) {
                user.matchedSongs = matchedSongs;
                validUsers.push(user);
                this.dispatch(addUser(user));
              }
              //next && next();
            });
          });
        }

      });

      let i = 0;

      function recursive(i) {
        if (i !== promises.length - 1) {
          promises[i]().then(recursive.bind(null, i + 1)).catch(e => {throw new Error(e)});
          i++;
        };
      }

      recursive(i);


      //promises[0](promises[1].bind(null,()=>resolve(validUsers)));

      // promises.forEach((p, i, arr)=> i !== arr.length - 1 ? p(arr[i + 1]) : p(()=> {
      //   resolve(validUsers);
      // }));

    });

  }

  getUsers(filters) {
    return new Promise((resolve, reject)=> {
      VK.Api.call('users.search', {
        sex: 1, school_city: 455, city: 314, count: 200, fields: 'photo_200,' +
        ' photo,can_see_audio, has_photo'
      }, r => {
        if (r.error) {
          reject(r.error);
        }

        const users = r.response.filter(user=>user.can_see_audio && user.has_photo);

        resolve(users);

        // this.getUsersSongs(users).then((result)=> {
        //   resolve(result);
        // });
      },);
    });
    //VK.Api.call('users.search', {sex:1, school_city:455, city:314,count:20} , r => console.log(r))
  }
}

export function filterBySongs(userSongs, selectedSongs) {
  if (!userSongs) return false;
  let result = [];
  selectedSongs.forEach(song => {
    const searchKey = song.hasOwnProperty('artist') ? 'artist' : 'title';
    const searchValue = song[searchKey];

    const matchedSongs = userSongs.filter(userSong=> {
      return typeof userSong === 'object' && userSong[searchKey].toLowerCase().includes(searchValue.toLowerCase())
    });
    if (matchedSongs.length > 0) {
      result = result.concat(matchedSongs);
    }
  });
  return result
}

export default ApiClient