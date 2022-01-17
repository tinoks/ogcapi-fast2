const { baseurl, title, desc,uploadfolder } = process.env;
const fs = require("fs");
const path = require('path');

function formatBytes(a,b=2,k=1024){with(Math){let d=floor(log(a)/log(k));return 0==a?"0 Bytes":parseFloat((a/pow(k,d)).toFixed(max(0,b)))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}}


const getUploads = async (req, reply, fastify) => {
  const { f } = req.query;
  console.log("uploadfolder:", process.env);
  const files = await fs.promises.readdir(uploadfolder)
  const fileStats  = files.map(file=> {
    const filePath = path.resolve(uploadfolder, file);
    const {ext} = path.parse(filePath);
    const {mtime, size} = fs.statSync(filePath);
    return {
      name: file,
      type: ext.substring(1).toUpperCase() + "-file",
      changed: mtime,
      size: formatBytes(size)
    }
  })

  if(f=="json"){
    reply.type('application/json').send(fileStats);
  }
  else{
    return reply.view("./src/views/uploads.eta",{fileStats});
  }
}

const uploadfile = async (req, reply, fastify) => {
  console.log(req.body)

  reply.send()

}

const deletefile = async (req, reply, fastify) => {
  const { file } = req.params;

  const filePath = path.resolve(uploadfolder, file);

  await fs.promises.unlink(filePath)
  
  reply.send()

}

module.exports = {
  getUploads,
  uploadfile,
  deletefile
}
