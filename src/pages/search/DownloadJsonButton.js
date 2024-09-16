import React from 'react';

export default function DownloadJsonButton({ searchResults }) {
    const handleDownload = () => {
        if (!searchResults) {
            console.error('No search results available.');
            return;
        }

        const jsonString = JSON.stringify(searchResults, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'searchResults.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleDownload}>
            Download Search Results as JSON
        </button>
    );
}
