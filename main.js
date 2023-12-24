const inputElement = document.getElementById('tiktokURL');
const resultContainer = document.getElementById('resultContainer');

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

        const coverImageElement = document.getElementById('coverImage');
        const downloadMusicButton = document.getElementById('downloadMusicButton');

        coverImageElement.src = coverImageUrl;
        coverImageElement.alt = responseData.title;

        // Show the image and download button
        coverImageElement.style.display = 'block';
        downloadMusicButton.style.display = 'block';

        // Add event listener to the download button
        downloadMusicButton.addEventListener('click', function() {
          const downloadLink = document.createElement('a');
          downloadLink.href = musicUrl;
          downloadLink.download = `${responseData.title}.mp3`;

          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.error('Invalid TikTok URL');
    // Display an error message to the user or handle the invalid URL case
  }
});
