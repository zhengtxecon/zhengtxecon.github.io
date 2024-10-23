---
title: 'Website Navigation'
date: 2024-10-23
permalink: /posts/website/navigation
tags:
  - website construction
---

#### Add a New Nevigation Choice
To create a new collection and display it under the navigation panel, follow these steps:

1. **Define the collection**: Edit `_config.yml` under the root directory of the website. Add a new collection definition. For example:

  ```yaml

    collections:
      new_collection:
      output: true
      permalink: /:collection/:path/
  ```
1. **Update the Settings**: Still in `_config.yml`, define how pages and collections are included in the site by defult. For example:
1. **Create the collection folder**: Inside the root directory, create a folder named `_new_collection`. Add markdown files for the collection inside this folder.
1. **Edit the Navigation Display**: Edit `navigation.yml` under `_data`. Edit to display the new collection in the navigation bar.
1. **Create the Collection Page**: Create `_new_collection.html` under `_pages` folder. Write the content to display.
1. **Add content to the collection**: Create markdown files inside the `_my_collection` folder.