window.addEventListener('DOMContentLoaded', async(e) => {

    console.log('Hi, I\'m here to inject some code...');
    document.cookie = "username=ims; path=/";
    document.cookie = "pass=passw0rd; path=/";


    // Gets the data from remote
    const getEntries = async() => {
        const endpoint = 'https://626b082ce5274e6664c6cc22.mockapi.io/vulnycao/entries';
        const response = await fetch(endpoint);
        return await response.json();
    }

    const data = await getEntries();

    // Sets data into HTML 
    // First, get entries container
    const entriesContainer = document.querySelector("div.intermediate-wrapper");
    // Second, the element to replicate
    const entryItem = document.querySelector("div.dv-lvl-3.forum-entry");

    // And here is the key: inject malicious persisted code into HTML
    data.forEach(dbItem => {
        // For each element, find the spot to inject the code

        const brandNewEntryItem = entryItem.cloneNode(true);

        const user = "p.par-lvl-5.entry-author";
        const postedAt = "span.sp-lvl-6";
        const entry = "p.par-lvl-5.entry-message";
        const likes = "span.sp-lvl-5.like";
        const notlikes = "span.sp-lvl-5.dont-like";

        brandNewEntryItem.querySelector(user).innerHTML += dbItem.user;
        brandNewEntryItem.querySelector(postedAt).innerHTML += dbItem.postedAt;
        brandNewEntryItem.querySelector(entry).innerHTML += dbItem.entry;
        brandNewEntryItem.querySelector(likes).innerHTML += dbItem.likes;
        brandNewEntryItem.querySelector(notlikes).innerHTML += dbItem.notlikes;

        entriesContainer.appendChild(brandNewEntryItem);

    });

    entriesContainer.removeChild(entryItem);

});