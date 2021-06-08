console.log('Loaded service worker!');

// self.addEventListener('push', ev => {
//   console.log('Loaded service worker!');
//   const data = ev.data.json();
//   console.log('Got push', data);
//   self.registration.showNotification(data.title, {
//     body: 'Hello, World!',
//     icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
//   });
// });

self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
