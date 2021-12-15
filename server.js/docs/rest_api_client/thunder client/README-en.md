<a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/README-en.md">Go back</a>

<a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/thunder%20client/README.md">Portuguese Verison</a>

## Index
 - [What is Thunder](#WhatIsThunder)
     - [Installation](#Installation)
     - [How to Use](#HowToUse)
 - [Importing a Collection](#ImportingACollectionAndEnviroments)


# Thunder


## <a name="WhatIsThunder"></a> What is Thunder:

In the world of Web development, Postman is the most chosen tool for performing API testing. However, relying on an external tool can often hinder development and testing. For this reason, thunder client was developed as an extension to VsCode to centralize this entire process within one location.

<a name="Installation"></a> Installation:

#### 1. Like any Visual Studio Code extension, installation is pretty simple.

![image](https://user-images.githubusercontent.com/71888050/142630831-20114e67-5a60-4526-9381-de9b021f5404.png)

<a name="HowToUse"></a> How to Use 

#### 2. First, we need an API to make the calls. For this, I created a very simple API with Json-Server. Next, let's click on the radius icon, which just appeared in VsCode.

![image](https://user-images.githubusercontent.com/71888050/142630988-5974a77d-8a59-4875-b117-cd987faad477.png)

#### 3. Thunder Client extension on VSCode 
When you click, a tab will open next to it, there will be all the requests made and a button to create a new request. In my case, since I haven't made any requests yet, I only see the button.

![image](https://user-images.githubusercontent.com/71888050/142631066-fa782919-137e-4b37-81a1-8f893eccad11.png)


#### 4. New Request on Thunder Client 
Now let's click New Request. The vision is similar to other HTTP clients, such as Postman, so we're already familiar with the tool and understand how it works.

![image](https://user-images.githubusercontent.com/71888050/142631095-6270bc2d-d8e9-48a8-8a3d-f574e3e77a68.png)


#### 5. Thunder Client 
Now, let's put the URL that will access our API in the search bar, select the method we will use and click Send. Once that's done, we'll see the following answer:

![image](https://user-images.githubusercontent.com/71888050/142631127-b8943167-002d-4242-99fb-f915559f5608.png)


#### 6. Thunder Client inserts 
To perform inserts is also quite simple! Just select the POST method next to it and then click body. That way, we can add all the information we want added.

![image](https://user-images.githubusercontent.com/71888050/142631292-f82521c6-44e8-4861-92b7-e72d9c1c4419.png)


#### 7. HTTP calls on thunder client 
Following this logic, you are able to make any HTTP call without major problems, as thunder client will support quietly and will not get in your way while running.


## <a name="ImportingACollectionAndEnviroments"></a> Importing a Collection

#### 1. First, click on the Thunder Client logo in your Visual Studio Code

![Thunder1](https://user-images.githubusercontent.com/71890228/142860674-22a3d10b-f746-4f91-be92-0fb88129ad06.png)

#### 2. Then click "Collections", and then "Import"

![Thunder2](https://user-images.githubusercontent.com/71890228/142863037-bfcdd9f0-006b-4c08-b4de-f3a4469ffb50.png)


#### 3. Now click on the file you want to import, in my case I will import the file "thunder-collection_Reprography System" that is in the "thunder-client" folder which in turn is in the folder "rest-api-client":

![Thunder3](https://user-images.githubusercontent.com/71890228/142861560-08f5bb20-d14f-4a15-8b9f-96756d69a196.png)

#### 4. Now, your Collections and Enviroments were imported:

![Thunder4](https://user-images.githubusercontent.com/71890228/142863383-568635ee-32ef-4386-ab44-965e88a87c50.png)

And so we finished the import.

How to import Collections and Enviroments via Thunder Client made with the help of this [Tutorial.](https://developers.refinitiv.com/en/article-catalog/article/how-to-test-http-rest-api-easily-with-visual-studio-code---thund)
