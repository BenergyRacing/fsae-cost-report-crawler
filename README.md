# FSAE Cost Report Crawler

This is an automated tool that exports FSAE Online cost reports into JSON files. It was created to help the team generate other documents based on the information that was already been registered there, saving a many hours of work every season.

This tool was developed at [B'Energy Racing](https://benergyracing.com.br), a Formula SAE Electric Team from the [Facens University Center](https://facens.br).

## Setting up

- Install NodeJS 16+
- Clone this project
- Run `npm install` to install the dependencies

## Running

Run `npm run start` and follow the instructions from the terminal window:
- You'll have to login to your account
- Then, you must click to manage a cost report
- After that, the process will begin automatically and a JSON file will be available at the end, as well as the attachment files.

Alternatively, you can run `npm run start:test` to manually input an already existing session and cost report URL.

## Output

The crawler will create a directory named `out/{vehicleId}`.
In this directory, it will produce a `cost-report.json` file (see the ["Cost" TypeScript interface](https://github.com/BenergyRacing/fsae-cost-report-crawler/tree/main/src/models) for a schema reference) and download all attachments named with their FSAE Online UUIDs. 

## Additional Tools

### Converting PDF to PNG

There is a tool to convert the first page of the PDF files into PNG images.
The tool reads the cost report JSON file and converts all PDFs into PNGs, adding them back to the list of attachments.

To convert the files, run `npm run tools:pdf-to-images`.
