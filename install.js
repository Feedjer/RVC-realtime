module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
   // {
    //  method: "shell.run",
     // params: {
     //   venv: "env",                // Edit this to customize the venv folder path
     //   path: "app",                // Edit this to customize the path to start the shell from
      //  message: [
     //     "pip install gradio devicetorch",
      //    "pip install -r requirements.txt"
      //  ]
    //  }
  //  },
    {
      when: "{{gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "pip install -r requirements.txt"
      }
    },
    {
      when: "{{platform === 'win32' && gpu === 'amd'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "pip install -r requirements-dml.txt"
      }
    },
    {
      when: "{{platform === 'linux' && gpu === 'amd'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "pip install -r requirements-amd.txt"
      }
    },
    {
        method: "shell.run",
        params: {
          path: "app/tools",                // Edit this to customize the path to start the shell from
          message: [
            "python download_models.py",
          ]
        }
      },
      {
          method: "shell.run",
          params: {
            venv: "env",                // Edit this to customize the venv folder path
            path: "app",                // Edit this to customize the path to start the shell from
           message: [
             "pip install -r requirements-win-for-realtime_vc_gui.txt",
             "pip install FreeSimpleGUI",
             "pip install numpy==1.23.5"
            ]
          }
        },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
    //  {
    //    method: "fs.link",
    //    params: {
    //      venv: "app/env"
    //    }
    //  },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
