# CSI-2132

## Directories
- scripts/SQL (Files to create and update the database)

## Running the backend (Node Server):

- Fill out a config.json file
    - you need to provide your username, password and the database you want to connect to.
    - The server will automatically run on port `:8000` If that's a problem change the port in the config.json
    - Make sure the config.json is never commited to the repo (already in a gitignore)
    - config.json must be in `./Server/` directory

-   Run the node server 
    - For windows:
        - You can either run the runBackend.ps1 scripts or you can manually write the lines in the script
    - For Mac OS X:
        - should be the same commands as runBackend.ps1
