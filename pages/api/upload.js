import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  return new Promise((resolve) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = `./public/uploads`;
    form.keepExtensions = true;
    form.maxFileSize = 2 * 1024 * 1024;

    form
      .on("field", function (field, value) {
        //receive form fields here
      })
      /* this is where the renaming happens */
      .on("fileBegin", function (name, file) {
        //rename the incoming file to the file's name
        const nameF = file.name;
        const index = nameF.indexOf(".");
        file.path =
          form.uploadDir +
          "/" +
          nameF.slice(0, index) +
          "-" +
          Date.now() +
          nameF.slice(index, nameF.length);
      })
      .on("file", function (field, file) {});

    form.parse(req, (err, fiels, files) => {
      res.status(200).json(files);
      return resolve();
    });
  });
};
