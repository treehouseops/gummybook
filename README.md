Remixed version of: https://github.com/slavingia/askmybook/

Demo: https://gummybook*5591c672e63c.herokuapp.com/

## Architecture decisions
* My main concern was speed, so I opted for as few libraries as possible and not introducing complicated patterns
    * State management: I opted for hooks mainly at the component level. I added the RecentQuestions component last and had to move some of that state management into the parent component, which if the app were to expand could be unruly 
    * Data: Simple REST calls with Axios
    * CSS: Inline styles within components since it didn't require any additional setup
* Since this is my first Ruby on Rails project, I learned and used standard Ruby practices and I replicated the same general structure of the original project to keep things simple. 

## Things I changed
* Separated the UI elements into components
* Handling errors for asking questions. The button now renables so the user can try again.
* Added recent questions that can serve as a history for the user and/or a way to interact quickly

## What I could improve
* Create a config file that stores all the values related to the specific PDF for easy modification
* CSS structure. I styled the majority of components inline, added global styles to application.css, and then when I had a bit more complicated styles for a bit of animation created a separate css file. Ideally I would style only at the component level.
* For a project this size, I think I struck a good balance, but if I wanted to work on this further I would add:
    * Users, with the ability to upload their own pdfs and open them up for questions
    * Tests, focusing on e2e
    * Implement types in the backend

## Issues I came across
* Building on Heroku was challenging because the compiling step stalled due to limited resources on the free tier. I had to precompile and push the assets to fix it for this demo.

