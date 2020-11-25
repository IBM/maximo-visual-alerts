# Analyze live video streams using IBM Maximo Visual Inspection

In this Code Pattern we'll provide a web application that has the ability to capture images from pre-recorded video or streaming cameras, and analyze each image using IBM Maximo Visual Inspection models.

As analysis results are received, they will then be labeled within the video stream, and rendered in a table and pie chart.

Furthermore, users can draw a "Region of Interest" if they'd only like to focus on analyzing images within a limited area of the camera feed.

One sample use case here can be used to monitor workers on a construction site..a user can draw an ROI near a dangerous area, and only get alerted when workers enter that area.

Users can also configure "alerts", which will be triggered when certain objects are visible in the image, and others are not.

Revisiting the construction site use case, an alert can be triggered whenever a worker is detected, but they do not have all of their safety equipment (helmet, mask gloves).

<!-- As analysis results are received, they can be grouped into positive or negative categories. -->

This code pattern is targeted towards users who have access to live streams or CCTV cameras, and would like to apply object detection and image classification to their live camera feeds.


<!-- When the reader has completed this Code Pattern, they will understand how to extract information from an IBM Maximo Visual Inspection instance as a CSV file, and how to visualize and filter the data within a web browser. -->

<!-- The intended audience for this Code Pattern -->

#  Components

* [IBM Maximo Visual Inspection](https://www.ibm.com/us-en/marketplace/ibm-powerai-vision). This is an image analysis platform that allows you to build and manage computer vision models, upload and annotate images, and deploy apis to analyze images and videos. Sign up for a trial account of IBM Maximo Visual Inspection [here](https://developer.ibm.com/linuxonpower/deep-learning-powerai/try-powerai/). This link includes options to provision a IBM Maximo Visual Inspection instance either locally on in the cloud.

# Flow

<img src="https://developer.ibm.com/developer/default/patterns/glean-insights-with-ai-on-live-camera-streams-and-videos/images/glean-insights-with-ai-on-live-camera-streams-and-videos-flow.png">


1. User accesses web application and provides login credentials for both the Camera system and IBM Maximo Visual Inspection. User also fills out form to select model and classify images as positive or negative.
2. Node.js backend connects to camera RTSP stream and forwards to frontend web application
3. As frontend plays live video, user clicks "Capture Frame" or "Start Interval"
4. Captured frames are forwarded to IBM Maximo Visual Inspection backend for analysis.
5. Analysis results are rendered in web app

# Prerequisites

* An account on IBM Marketplace that has access to IBM Maximo Visual Inspection. This service can be provisioned [here](https://developer.ibm.com/linuxonpower/deep-learning-powerai/vision/access-registration-form/)

You will also need to train and deploy a custom model beforehand. This can be done following the steps in this [video](https://www.youtube.com/watch?v=-gzGuj3B__U)

<!-- * Docker - Can be used to run the application in a virtual container. If running via docker, the remaining prerequisites can be bypassed, and you can skip ahead to the steps labeled **docker** in [step 2](#2-start-application) -->

* ffmpeg - Package used here to connect to remote RTSP streams
```
# Linux
apt install ffmpeg

# Macbook OS X
brew install ffmpeg
```

* Node.js

Skip to [Steps](#maximo-visual-alerts) if you already have node.js installed on your system.

### Install Node.js packages

If expecting to run this application locally, please install [Node.js](https://nodejs.org/en/) and NPM. Windows users can use the installer at the link [here](https://nodejs.org/en/download/).

If you're using Mac OS X or Linux, and your system requires additional versions of node for other projects, we'd suggest using [nvm](https://github.com/creationix/nvm) to easily switch between node versions. Install nvm with the following commands.

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```


```bash
# Place next three lines in ~/.bash_profile
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```


```bash
nvm install v8.9.0
nvm use 8.9.0
```

# Steps

Follow these steps to setup and run this Code Pattern.

1. [Clone repository](#1-clone-repository)
2. [Start web application](#2-start-application)
3. [Configure web application](#3-configure-web-application)
4. [Observe results](#4-observe-results)
<!-- 5. [Create a Dashboard](#4-create-dashboard) -->

## 1. Clone repository

```
git clone https://github.com/IBM/maximo-streaming-video-analysis
```

Navigate to the project folder
```
cd maximo-streaming-video-analysis
```

## 2. Start application

**Local Deployment**
Install frontend dependencies
```
cd maximo-streaming-video-analysis
cd frontend
npm install
```

Start frontend
```
npm run serve
```

In a separate terminal tab, install backend dependencies
```
cd maximo-streaming-video-analysis
cd backend
npm install
```

Start backend
```
PORT=3000 npm start
```

<!-- **Docker**
Start Backend
```
docker run -it -p 3000:3000 kkbankol/maximo-live /bin/bash -c "cd /maximo-streaming-video-analysis/backend && PORT=3000 npm start"
```

Start frontend
```
# frontend
docker run -it -p 8080:8080 kkbankol/maximo-live /bin/bash -c "cd /maximo-streaming-video-analysis/frontend && npm run serve"
``` -->

## 3. Configure web application
Access the web application at [localhost:8080](localhost:8080).

Click "Login" and provide the url, username, and password for the Maximo Visual Inspection instance. These credentials should have been provided in your welcome letter.

<img src="https://i.imgur.com/bF0Nkdn.png" />

Next, click "Configure Model" in the Menu. Select your custom model. Then, select objects or classes associated with that model that you'd like to observe in the dashboard.

<img src="https://i.imgur.com/NGsSvvi.png" />

We can also optionally configure an "alert". Alerts can be triggered when specific objects are detected within a frame. We can also configure alerts to detect an incomplete "set" of objects...for example, if a worker is detected, but their safety equipment (helmet, vest, mask, etc) is not visible. So in this example, we will configure an alert titled "Missing PPE", which will notify us when a worker is detected and a safety vest is not visible.

<img src="https://i.imgur.com/pN8D7l9.png" />

Furthermore, we also have "actions". These are used to make a custom API request when a certain alert is triggered. External API requests can be used to programmatically send Slack messages, emails (Sendgrid), texts (Twilio), and more.

<img src="https://i.imgur.com/I45853P.png" />

We have also added a method to draw a "Region of Interest"...this is useful for workplaces that have specific areas that require equipment (i.e "Hard Hat Zone"). To do so, simply hover your cursor over the video, click once to begin drawing the bounding box, and then click again to close the bounding box. As a user draws a region of interest, alerts and objects will only be observed within that region, all others will be ignored. A region of interest can be adjusted. In the animation below, we can see how results are being rendered in the full image. But after drawing the region of interest, the rendered objects are limited to that region.

<img src="https://i.imgur.com/Hmplum3.gifv" />


After selecting the relevant model categories, we can then begin streaming a video to the application for analysis. Currently, this app supports the following video sources.

1. Webcam - This is the default method, and requires no configuration
2. [RTSP](https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol) - RTSP is a streaming protocol commonly used by CCTV cameras. To connect to an RTSP stream, click the "Stream RTSP" button, provide the URL and the login credentials (if applicable).
3. Youtube - To playback a Youtube video for analysis, click the "Stream RTSP" button and enter the Youtube URL.
4. Local Video File - Click the "Upload Video" button and drag and drop your video file.

Configure a remote video by hovering over "Set Video Source" and click "Remote Stream"

Or upload a video file by hovering over "Set Video Source" and click "Upload Video"

After clicking "Submit" in the "Stream RTSP" or "Upload File" modal, the video should immediately begin playing in the browser.

## 4. Observe results

Once the video begins playing, click the "Start Analysis of Feed" button to analyze a frame every second. This interval can be adjusted by hovering over the gear icon and clicking "set interval of feed".

As results are received that match the model configuration, they will then be rendered in the "Objects" section in the middle of the page.

<img src="https://i.imgur.com/wzvigW4.png"/>

Clicking on one of the inference results will show a popup modal with detailed information for that particular inference, such as the identified class/object, heatmap/bounding boxes, and confidence score.

<!-- <img src="https://i.imgur.com/X0UnZhd.png" /> -->

Clicking the bell icon in the upper right shows a list of all alerts that were triggered

<img src="https://i.imgur.com/ZcsXuge.png" />


# Learn more

* **Watson IOT Platform Code Patterns**: Enjoyed this Code Pattern? Check out our other [Maximo Visual Inspection Code Patterns](https://developer.ibm.com/series/learning-path-powerai-vision/).

<!-- * **Knowledge Center**:Understand how this Python function can load data into  [Watson IOT Platform Analytics](https://www.ibm.com/support/knowledgecenter/en/SSQP8H/iot/analytics/as_overview.html) -->

# License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
