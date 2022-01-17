const { baseurl, title, desc } = process.env;

getProcesses = async (req, reply, fastify) => {
  const { f } = req.query;

  if(f=="json") {
    reply.send({
      "links": [
        {
          "rel": "self",
          "href": baseurl + "/processes"
        }
      ],
      "processes": [
        {
          "id": "helloworld",
          "title": "HelloWorld",
          "description": "Output and Hello World string",
          "keywords": [],
          "version": "1.0.0",
          "jobControlOptions": [
            "sync-execute",
            "dismiss"
          ],
          "outputTransmission": [
            "value",
          ],
          "links": [
            {
              "rel": "self",
              "type": "application/json",
              "title": "Process Description",
              "href": baseurl + "/processes/helloworld"
            }
          ]
        }]
    })
  }
  else{
    return reply.view("./src/views/processes.eta");
  }

};

getProcessDescription = async (req, reply, fastify) => {
  const { f } = req.query;
  const dummyProcess = {
    "version": "0.2.0",
    "id": "hello-world",
    "title": "Hello World",
    "description": "An example process that takes a name as input, and echoes it back as output. Intended to demonstrate a simple process with a single literal input.",
    "keywords": [
      "hello world",
      "example",
      "echo"
    ],
    "links": [
      {
        "type": "text/html",
        "rel": "canonical",
        "title": "information",
        "href": "https://example.org/process",
        "hreflang": "en-US"
      },
      {
        "type": "text/html",
        "rel": "collection",
        "href": "https://demo.pygeoapi.io/master/jobs?f=html",
        "title": "jobs for this process as HTML",
        "hreflang": "en-US"
      },
      {
        "type": "application/json",
        "rel": "collection",
        "href": "https://demo.pygeoapi.io/master/jobs?f=json",
        "title": "jobs for this process as JSON",
        "hreflang": "en-US"
      }
    ],
    "inputs": {
      "name": {
        "title": "Name",
        "description": "The name of the person or entity that you wish tobe echoed back as an output",
        "schema": {
          "type": "string"
        },
        "minOccurs": 1,
        "maxOccurs": 1,
        "metadata": null,
        "keywords": [
          "full name",
          "personal"
        ]
      },
      "message": {
        "title": "Message",
        "description": "An optional message to echo as well",
        "schema": {
          "type": "string"
        },
        "minOccurs": 0,
        "maxOccurs": 1,
        "metadata": null,
        "keywords": [
          "message"
        ]
      }
    },
    "outputs": {
      "echo": {
        "title": "Hello, world",
        "description": "A \"hello world\" echo with the name and (optional) message submitted for processing",
        "schema": {
          "type": "object",
          "contentMediaType": "application/json"
        }
      }
    },
    "example": {
      "inputs": {
        "name": "World",
        "message": "An optional message."
      }
    },
    "jobControlOptions": [
      "sync-execute"
    ],
    "outputTransmission": [
      "value"
    ]
  };

  if(f=="json") {
    reply.send(dummyProcess)
  }
  else{
    return reply.view("./src/views/process.eta",{process:dummyProcess});
  }

  reply.send()
};

getJobs = async (req, reply, fastify) => {
  reply.status(501).send()
};

executeJob = async (req, reply, fastify) => {
  const {response, inputs} = req.body;

  console.log(req.body)
  if(response == "raw")  reply.status(200).send({
    "id": "echo",
    "value": `Hello ${inputs.name}! ${inputs.message}`
  })
  reply.status(501).send()

};

getJobStatus = async (req, reply, fastify) => {
  reply.status(501).send()
};

deleteJob = async (req, reply, fastify) => {
  reply.status(501).send()
};

getJobResults = async (req, reply, fastify) => {
  reply.status(501).send()
};

module.exports = {
  getProcesses,
  getProcessDescription,
  getJobs,
  executeJob,
  getJobStatus,
  deleteJob,
  getJobResults,
}