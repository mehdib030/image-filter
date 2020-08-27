import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage/:image_url?", async ( req, res ) => {

    var validUrl = require('valid-url');

    let paths = new Array();
    //paths.push('/Users/mehdibenyebka/udacity/cloud/cloud-developer/course-02/project/image-filter-starter-code/src/util/tmp/filtered.350.jpg')
    //deleteLocalFiles(paths)

    console.log("** Getting image **")
    let  url  = req.query.image_url;

    let filteredPath =  "";

    console.log("** Getting image URL :",url)

    if(url){

      if (validUrl.isUri(url)){
        console.log('Looks like an URI');
        console.log("** Getting the image ... ",url)
        filteredPath = await filterImageFromURL(url)
        console.log("** filteredPath = ",filteredPath)

        res.sendFile(filteredPath,function (err) {
          if (err) {
          console.log(res.statusMessage);
          } else {
            paths.push(filteredPath);
            deleteLocalFiles(paths)
          }
        })

      } 
      else {
          console.log('Not a URI');
      }
    }

      } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();