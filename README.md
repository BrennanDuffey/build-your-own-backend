# build-your-own-backend

## Description
This is a translational one-to-many back-end repository storing NAQT categories and tossups that allows four GET routes, two POST routes, and two DELETE routes.

## Setup

Simply begin by cloning down the repository.

```bash
git clone https://github.com/BrennanDuffey/build-your-own-backend.git
```

Once cloned run 

```bash
npm i
``` 

and 

```bash
npm i nodemon -g
``` 
Now to run the server locally in the development environment with: 

```bash
nodemon server.js
``` 
## Route Information

``` GET /api/v1/tossups ```
### Response

``` Status: 200 OK
[
    {
        "id": 2,
        "question": "Description acceptable. A paper by Urribarri, Rios, and Ferrer hoped that treatment with ammonia would allow this process to be used as a source of raw vegetable protein for the feeding of livestock. Pollution with poliaspartic acid and disruption of the hypolemnitic cone have been suggested as causes of this phenomenon, which may result in lower (*) oxygen levels that threaten the curbina fishery. Researchers at the University of Zulia blamed ships from Florida or Texas for starting this phenomenon by transporting an  ► invasive species of genus Lemna. For 10 points, what bloom of aquatic plants threatens the ecological health of a certain lake in western Venezuela?",
        "answer": "duckweed infestation of Lake Maracaibo (accept equivalents)",
        "category_id": 2,
        "created_at": "2019-06-30T23:50:26.646Z",
        "updated_at": "2019-06-30T23:50:26.646Z"
    },
    {
        "id": 4,
        "question": "The \"Spreuer\" example of this feature in Switzerland contains Kaspar Meglinger's 17th-century paintings of the Danse Macabre. Examples of these features from Qing Dynasty China include the \"stepping toad\" and the \"eternal celebration.\" The longest feature of this type in the world, at Hartland in New Brunswick, was damaged by ice in the 1920s. The \"Burr (*) arch\" is a typical design for these structures, which exist at Kaufman's Distillery, White Rock Forge, and Landis Mill in Lancaster County, Pennsylvania. A 1992 novel by ► Robert James Waller centers on a photographer who is assigned to document these features in Madison County, Iowa. For 10 points, identify this kind of river crossing that is protected from rain and snow.",
        "answer": "covered bridges (prompt on \"bridges\")",
        "category_id": 2,
        "created_at": "2019-06-30T23:50:26.646Z",
        "updated_at": "2019-06-30T23:50:26.646Z"
    },
    {
        "id": 5,
        "question": "One person at issue during this event was Charles Maultsby, who veered off-course and got lost. Atelegram whose first three words were \"YOUR ACTION DESPERATE\" was sent during this event byBertrand Russell. An operation misleadingly codenamed with the place name Anadyr preceded this event,which was chronicled in the memoir Thirteen (*) Days. The claim \"I am prepared to wait until Hell freezesover\" was made by UN Ambassador Adlai Stevenson during this event, which inspired the creation of a \"hotline\"between two world capitals. It was resolved when the Americans agreed to secretly remove its Jupiter weapons fromTurkey. For 10 points, name this tense period in 1962 which began when nuclear weapons were discovered in acountry ruled by Fidel Castro.",
        "answer": "Cuban Missile Crisis [prompt on October Crisis]",
        "category_id": 4,
        "created_at": "2019-06-30T23:50:26.649Z",
        "updated_at": "2019-06-30T23:50:26.649Z"
    }
]
```

``` GET /api/v1/categories ```
### Response
```
Status 200 OK
[
    {
        "id": 2,
        "name": "Geography",
        "created_at": "2019-06-30T23:50:26.631Z",
        "updated_at": "2019-06-30T23:50:26.631Z"
    },
    {
        "id": 4,
        "name": "American History",
        "created_at": "2019-06-30T23:50:26.631Z",
        "updated_at": "2019-06-30T23:50:26.631Z"
    },
    {
        "id": 3,
        "name": "Physics",
        "created_at": "2019-06-30T23:50:26.631Z",
        "updated_at": "2019-06-30T23:50:26.631Z"
    },
    {
        "id": 5,
        "name": "Biology",
        "created_at": "2019-06-30T23:50:26.632Z",
        "updated_at": "2019-06-30T23:50:26.632Z"
    }
]

``` GET /api/v1/tossups/:id```
