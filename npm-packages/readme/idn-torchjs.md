# torchjs

Requirements:

    sudo apt install g++ cmake unzip

Currently only support linux x86_64.

    npm install @idn/torchjs

Export model from pytorch:

```python
import torch
import torchvision

# An instance of your model.
model = torchvision.models.resnet18(pretrained=True)

# An example input you would normally provide to your model's forward() method.
example = torch.rand(1, 3, 224, 224)

# Use torch.jit.trace to generate a torch.jit.ScriptModule via tracing.
traced_script_module = torch.jit.trace(model, example)

traced_script_module.save("resnet18.pt")
```

Example:

```javascript
var torchjs = require('@idn/torchjs');
var script_module = new torchjs.ScriptModule('resnet18.pt');
var tensor = torchjs.ones([1, 3, 224, 224], false);

const { performance } = require('perf_hooks');

// Comment this out if you don't have cuda
script_module.cuda();
let start, end;
start = performance.now();
let otensor = script_module.forward(tensor);
end = performance.now();
console.log(`      gpu: ${end - start} ms`);
```
