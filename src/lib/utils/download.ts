import { resumeAsset } from "@/content/assets/resume";

export const onDownloadResume = () => {
    
    const downloadLink = document.createElement('a');
    downloadLink.href = resumeAsset.localPath; 
    downloadLink.download = resumeAsset.localDownloadFileName; 
    downloadLink.click();

    // Open Google Drive link in a new tab
    window.open(resumeAsset.driveViewUrl, '_blank'); // Replace with your Google Drive link
  };
