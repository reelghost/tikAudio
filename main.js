const inputElement = document.getElementById('tiktokURL');
const coverImageElement = document.getElementById('coverImage');
const downloadMusicLink = document.getElementById('downloadMusicLink');
const tiktokAuthor = document.getElementById('authorName');

inputElement.addEventListener('input', function(event) {
  const url = event.target.value;

  if (url.includes('tiktok.com')) {
    const endpoint = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;

    axios.get(endpoint)
      .then(response => {
        const responseData = response.data.data;
        console.log(responseData);
        // filename
        const filenameWithSpaces = responseData.title;
        // Sanitize the filename by replacing spaces with underscores
        const sanitizedFilename = filenameWithSpaces.replace(/\s+/g, '_');

        const coverImageUrl = responseData.cover;
        const musicUrl = responseData.music;

        coverImageElement.src = coverImageUrl;
        coverImageElement.alt = sanitizedFilename;

        // Show the image and download link
        coverImageElement.style.display = 'block';
        downloadMusicLink.style.display = 'block';

        // Update download link attributes
        downloadMusicLink.href = musicUrl;
        downloadMusicLink.download = `${sanitizedFilename}.mp3`;

        // show the author name
        tiktokAuthor.textContent = responseData.author.nickname;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.error('Invalid TikTok URL');
    // Display an error message to the user or handle the invalid URL case
  }
});

downloadMusicLink.addEventListener('click', function(event) {
  const musicUrl = this.href;
  const title = this.download;

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

  event.preventDefault(); // Prevent the default behavior of the link
});
