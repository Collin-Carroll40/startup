# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Startup Server Setup
EC2 Instance Setup

Region: Selected US East (N. Virginia) us-east-1 (Required for class AMI).

AMI: Used the specific class image: ami-094c4a0be0b642a24 (Web Programming 260 Server v8).

Instance Type: t3.micro (Free tier eligible).

Key Pair: Created startup-key.pem and stored it locally (permissions set to 400).

Firewall (Security Group): Configured to allow SSH (22), HTTP (80), and HTTPS (443) from anywhere.

Networking (Elastic IP)

Allocated a permanent Elastic IP address (100.51.137.17) to prevent IP changes on reboot.

Associated the Elastic IP with the running EC2 instance.

Domain Registration (Route 53)

Registered domain: collincarroll-startup.click.

(Note: required upgrading AWS account to paid plan to bypass student restrictions).

Verified email address to prevent domain suspension.

DNS Configuration

Created two A Records in Route 53 pointing to the Elastic IP (100.51.137.17):

Root (@): collincarroll-startup.click

Wildcard (*): *.collincarroll-startup.click (covers simon. and startup. subdomains).

Server Configuration (Caddy & HTTPS)

SSH Access: Connected to server via terminal: ssh -i startup-key.pem ubuntu@100.51.137.17

Caddyfile: Edited /etc/caddy/Caddyfile to remove the default :80 block and add HTTPS support for three routes:

Root (/usr/share/caddy for static files)

startup. subdomain (Reverse proxy to port 4000)

simon. subdomain (Reverse proxy to port 3000)

Restart: Applied changes with sudo service caddy restart.

Result: Verified site loads with a secure connection (HTTPS/Lock icon).
## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

- **Structure:** Created the main application structure using semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`) across five different pages.
- **Pages Created:**
  - `index.html`: The login page serving as the entry point.
  - `dashboard.html`: The main team interface with placeholders for charts, live activity (WebSocket), and news (3rd party API).
  - `leads.html`: A data-rich page displaying a table of leads (database placeholder).
  - `import.html`: A functionality page for uploading files (input placeholder).
  - `cadence.html`: A feature page for building outreach sequences.
- **Page Components:**
  - Added a consistent navigation sidebar to simulate the application's flow.
  - Implemented input forms for login, file uploads, and message composition.
  - Added specific placeholders for WebSocket data (live team activity feed) and 3rd party service calls (industry news ticker).
  - Used inline SVG to create a scalable application logo.
- **Deployment:** Successfully deployed the startup application to `https://startup.collincarroll-startup.click` and the Simon prerequisite to `https://simon.collincarroll-startup.click` using the `deployFiles.sh` script.

### Code Examples

I implemented a consistent sidebar navigation structure using HTML tables (to be replaced with Flexbox in the CSS deliverable) and updated the links to navigate between all 5 pages:

```html
<td width="20%" valign="top">
  <nav>
    <ul>
      <li><a href="dashboard.html">Team Dashboard</a></li>
      <li><a href="leads.html">Available Leads</a></li>
      <li><a href="import.html">Import Leads</a></li>
      <li><a href="cadence.html">My Cadence</a></li>
      <li><a href="index.html">Logout</a></li>
    </ul>
  </nav>
</td>



## CSS

Flexbox Layout
Used a column layout on the body to pin the header and footer while the main content fills the viewport.

Main Container
Replaced old HTML tables with a `.main-container` using `display: flex` to align the sidebar and content side-by-side.

Responsive Design
Implemented media queries to switch to `flex-direction: column` on screens smaller than 700px for mobile compatibility.

CSS Animations
Added `@keyframes` with a `fadeIn` effect on the `<main>` element to improve UI transitions.

Tables
Styled lead lists with zebra-striping and padding for better scannability.

Placeholders
Styled metrics and live feeds to represent future WebSocket/API data integration.


## React Part 1: Routing

Setting Up the Engine
Node & NPM: I started by initializing the project with npm init -y. I then installed the "big three" for this phase: vite for bundling, react for the UI, and react-router-dom to handle the navigation.

Vite Configuration: I updated my package.json with new scripts (dev, build, preview) so I can run a local server that updates instantly as I code.

Clean House: I created a .gitignore file to make sure I don't accidentally upload my massive node_modules folder to GitHub (keep it clean!).

Rebuilding the Structure
Folder Overhaul: I moved all my logic into a new src folder and put static assets like my dashboard images into public.

Componentization: This was the coolest part. I took my old HTML files and turned them into reusable React components:

Login: Now a React component that uses a Link instead of a form action to move users into the app.

Dashboard & Leads: I ported over the tables and charts, making sure to fix the syntax for React (like changing class to className and fixing inline styles).

CSS Refactor: I renamed main.css to app.css and adjusted the body selector to .body so my layout wouldn't fight with the React root container.

🛣️ Mapping the Routes
The Shell: I created a main index.html and index.jsx to serve as the entry point for the whole app.

React Router: Inside app.jsx, I set up the BrowserRouter and defined all my paths.

Smart Links: I swapped out all my old <a> tags for NavLink components. Now, the app switches "pages" instantly without the browser ever having to refresh.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
