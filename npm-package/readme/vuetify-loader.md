# vuetify-loader

<p>
  <a href="https://www.patreon.com/kaelwd">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
  </a>
</p>

## Automatic Imports
`vuetify-loader` will automatically import all Vuetify components as you use them

```js
// webpack.config.js

const { VuetifyLoaderPlugin } = require('vuetify-loader')

exports.plugins.push(
  new VuetifyLoaderPlugin()
)
```

You can also provide a custom match function to import your own project's components too:
```js
// webpack.config.js

const { VuetifyLoaderPlugin } = require('vuetify-loader')

exports.plugins.push(
  new VuetifyLoaderPlugin({
    /**
     * This function will be called for every tag used in each vue component
     * It should return an array, the first element will be inserted into the
     * components array, the second should be a corresponding import
     *
     * originalTag - the tag as it was originally used in the template
     * kebabTag    - the tag normalised to kebab-case
     * camelTag    - the tag normalised to PascalCase
     * path        - a relative path to the current .vue file
     * component   - a parsed representation of the current component
     */
    match (originalTag, { kebabTag, camelTag, path, component }) {
      if (kebabTag.startsWith('core-')) {
        return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
      }
    }
  })
)
```

or if you're using Vue CLI:
```js
// vue.config.js

module.exports = {
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }])
  }
}
```

```html
<template>
  <core-form>
    <v-card>
      ...
    </v-card>
  </core-form>
</template>

<script>
  export default {
    ...
  }
</script>
```

Will be compiled into:

```html
<template>
  <core-form>
    <v-card>
      ...
    </v-card>
  </core-form>
</template>

<script>
  import { VCard } from 'vuetify/lib'
  import CoreForm from '@/components/core/Form.vue'

  export default {
    components: {
      VCard,
      CoreForm
    },
    ...
  }
</script>
```

## Progressive images

`vuetify-loader` can automatically generate low-res placeholders for the `v-img` component

**NOTE:** You ***must*** have [ImageMagick](https://www.imagemagick.org/script/index.php), [GraphicsMagick](http://www.graphicsmagick.org/), or [sharp](https://github.com/lovell/sharp) installed for this to work

Add `progressiveImages` to the plugin options:
```js
exports.plugins.push(
  new VuetifyLoaderPlugin({
    progressiveImages: true
  })
)

// vue-cli
module.exports = {
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      progressiveImages: true
    }])
  }
}
```

And away you go!
```html
<v-img src="@/assets/some-image.jpg"></v-img>
```

**NOTE:** The src must follow [vue-loader's transform rules](https://vue-loader.vuejs.org/guide/asset-url.html#transform-rules)

### Loops and dynamic paths

`progressiveImages` only works on static paths, for use in a loop you have to `require` the image yourself:

```html
<v-img v-for="i in 10" :src="require(`@/images/image-${i}.jpg?vuetify-preload`)" :key="i">
```

### Configuration

`progressiveImages: true` can be replaced with an object for advanced configuration

```js
new VuetifyLoaderPlugin({
  progressiveImages: {
    size: 12, // Use higher-resolution previews
    sharp: true // Use sharp instead of ImageMagick
  }
})
```

#### Options

##### `size`

Type: `Number`
Default: `9`

The minimum dimensions of the generated preview images in pixels

##### `resourceQuery`

Type: `RegExp`
Default: `/vuetify-preload/`

Override the resource qury to match v-img URLs

If you only want some images to have placeholders, add `?lazy` to the end of the request:
```html
<v-img src="@/assets/some-image.jpg?lazy"></v-img>
```

And modify the regex to match:
```js
new VuetifyLoaderPlugin({
  progressiveImages: {
    resourceQuery: /lazy\?vuetify-preload/
  }
})
```

##### `sharp`

Type: `Boolean`
Default: `false`

Use sharp instead of GM for environments without ImageMagick. This will result in lower-quality images

##### `graphicsMagick`

Type: `Boolean`
Default: `false`

Use GraphicsMagic instead of ImageMagick

##### `registerStylesSSR`

Type: `Boolean`
Default: `false`

Register Vuetify styles in [vue-style-loader](https://github.com/vuejs/vue-style-loader).

This fixes styles not being loaded when doing SSR (for example when using [@nuxtjs/vuetify](https://github.com/nuxt-community/vuetify-module)).
As Vuetify imports styles with JS, without this option, they do not get picked up by SSR.

⚠️ This option requires having `manualInject` set to `true` in [`vue-style-loader`](https://github.com/vuejs/vue-style-loader#options) config.
