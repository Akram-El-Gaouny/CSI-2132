# CSI-2132

## Directories
- scripts/SQL (Files to create and update the database)

## Running the backend (Node Server):

```
// Make sure you have node installed
npm -v 
```

You can install it from [here](https://nodejs.org/en/download/).

- Fill out a config.json file 
    - make a copy of this [file]() and and place it `./Server/` directory
    - you need to provide your username, password and the database you want to connect to.
    - The server will automatically run on port `:8000` If that's a problem change the port in the config.json
    - Make sure the config.json is never commited to the repo (already in a gitignore)
    
-   Run the node server 
    - For windows:
        - You can either run the runBackend.ps1 scripts or you can manually write the lines in the script
    - For Mac OS X:
        - should be the same commands as runBackend.ps1
