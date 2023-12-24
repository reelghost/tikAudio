const inputElement = document.getElementById('tiktokURL');
const coverImageElement = document.getElementById('coverImage');
const downloadMusicButton = document.getElementById('downloadMusicButton');

inputElement.addEventListener('input', function(event) {
  const url = event.target.value;

  if (url.includes('tiktok.com')) {
    const endpoint = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;

    axios.get(endpoint)
      .then(response => {
        const responseData = response.data.data;
        console.log(responseData);

        const coverImageUrl = responseData.cover;
        const musicUrl = responseData.music_info.play;

        coverImageElement.src = coverImageUrl;
        coverImageElement.alt = responseData.title;

        // Show the image and download button
        coverImageElement.style.display = 'block';
        downloadMusicButton.style.display = 'block';

        // Set download link attributes
        downloadMusicButton.dataset.url = musicUrl;
        downloadMusicButton.dataset.title = responseData.title;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.error('Invalid TikTok URL');
    // Display an error message to the user or handle the invalid URL case
  }
});

downloadMusicButton.addEventListener('click', function() {
  const musicUrl = this.dataset.url;
  const title = this.dataset.title;

  if (musicUrl && title) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Hide the iframe
  
    // Set the source of the iframe to trigger the download
    iframe.src = musicUrl + `?title=${encodeURIComponent(title)}.mp3`;
    
    document.body.appendChild(iframe);
  
    // Remove the iframe after a short delay to trigger the download
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  } else {
    console.error('Invalid music URL or title');
  }
});
