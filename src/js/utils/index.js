/* global VK */
class ApiClient {
  getSongs(owner_id, count = 20) {
    return new Promise((resolve, reject)=> {
      //VK.Api.call('audio.get', {owner_id:17653538, count:999} , r => console.log(r))
      VK.Api.call('audio.get', { owner_id, count }, r => {
        if (r.error) {
          reject(r.error);
        }
        console.log(r.response);
        resolve(r.response);
      });
    })
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

  getUsers(filters) {
    return new Promise((resolve, reject)=> {
      VK.Api.call('users.search', {
        sex: 0, school_city: 455, city: 314, count: 10, fields: 'photo_200,' +
        ' photo,can_see_audio'
      }, r => {
        if (r.error) {
          reject(r.error);
        }

        const users = r.response.filter(user=>user.can_see_audio);

        const promises = users.map(user=> {
            return this.getSongs(user.uid);
        });
        console.log(r.response);
        Promise.all(promises).then((responses)=> {
          console.log(responses);
          resolve(users);
        });
      },);
    })
    //VK.Api.call('users.search', {sex:1, school_city:455, city:314,count:20} , r => console.log(r))
  }
}
export default ApiClient