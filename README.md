# Tiny Pictor

A tiny image compress cross-platform cli based on sharp.

This cli can process a single image or a directory of images.

If you specify a directory, Tiny Pictor will automatically output according to the original directory structure.

## Install

Tiny Pictor runs on Node.js >= 18.17.0 and is available as a NPM package.

```bash
npm install -g tiny-pictor
```

## Dev

If you want to contribute to Tiny Pictor, you will need to clone the repository and install the dependencies.

```bash
git clone
cd tiny-pictor
npm install
npm build
npm link
```

Then you can debug the CLI with `tiny-pictor` or `tp` command.

## Usage

Tiny Pictor complete some basic image compress operations.

You can see the help information by `tiny-pictor --help` or `tp --help`.

Or you can read [the document of sharp](https://sharp.pixelplumbing.com/) to learn more about the options.

### Global Options

All command can use the global options as follow.

```bash
'-i, --input <input>', 'input image path'
'-o, --output <output>', 'output image path'
```

### Resize

You can resize the image by `tiny-pictor resize -i <input> -o <output> [options]`.

```bash
'-w, --width <width>', 'width of the output image'
'-h, --height <height>', 'height of the output image'
```

## Contributing

Contributions are welcome and appreciated.

You can find Tiny Pictor on GitHub; feel free to open an issue or create a pull request.

For more information, read the [contribution guide](https://github.com/TypeStrong/typedoc/blob/master/.github/CONTRIBUTING.md).
