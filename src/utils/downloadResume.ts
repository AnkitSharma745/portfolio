const resume = "/assets/files/AnkitSharmaResume.pdf";
export const onDownloadResume = () => {
    
    const downloadLink = document.createElement('a');
    downloadLink.href = resume; 
    downloadLink.download = "AnkitSharmaResume.pdf"; 
    downloadLink.click();

    // Open Google Drive link in a new tab
    window.open('https://drive.google.com/file/d/1JoEIb7jWp_K1yelIFObAnIKE6VbxF4MR/view?usp=drive_link', '_blank'); // Replace with your Google Drive link
  };