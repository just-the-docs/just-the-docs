txreader
=========

description
------------
Handling transcript information data. (Node.js)
(e.g. knownGene.txt)

installation
-------------

    $ npm install txreader

dependencies
-------------
- [dna](https://github.com/shinout/dna)
- [fastareader](https://github.com/shinout/FASTAReader)

usage
------

create an instance

    var tx = TxReader.create('knownGene.txt', {
      xref: 'kgXref.txt' // gene name info (optional)
    });

get info from ucsc transcript id

    var info = tx.getInfo('uc001acn.2'); // info object (explains later)

get ucsc transcripts ids from gene name

    var BCRs = tx.getTxsByGene('BCR');

get ucsc transcript ids from refseq id

    var NMs  = tx.getTxsByRefSeqId('NM_033487'); // get list of transcripts whose refseq id is 'NM_033487'


## API Documentation ##
- TxReader.create(knownGene, options)
- txr.getTxsByExon(formattedExon)
- txr.getTxsByGene(geneName)
- txr.getTxsByRefSeqId(refseqId)
- txr.getNames()
- txr.getGeneName(txname)
- txr.getRefSeqId(txname)
- txr.getInfo(name)
- txr.getExons(name)
- txr.getSeq(name, fr, options)
- TxReader.parseLine(line)

### TxReader.create(knownGene, options) ###
Creates an instance of TxReader.

**knownGene** is a file UCSC provides.
The file format is in [http://hgdownload.cse.ucsc.edu/goldenPath/hg19/database/](http://hgdownload.cse.ucsc.edu/goldenPath/hg19/database/)knownGene.txt.gz

**options** is option object.

<table>
<tr><th>key</th>
<td>description</td>
<td>example</td></tr>

<tr><th>xref</th>
<td>xref file (compatible with
<a href="http://hgdownload.cse.ucsc.edu/goldenPath/hg19/database/">http://hgdownload.cse.ucsc.edu/goldenPath/hg19/database/</a>kgXref.txt.gz
)
</td>
<td>kgXref.txt</td></tr>

<tr><th>noCacheInfo</th>
<td>if true, not caching transcript information</td>
<td>true</td></tr>
</table>

### txr.getInfo(name) ###
Gets an information object of a transcript.

**name** is a name of transcript.

Returns information object, following the format.

<table>
<tr><th>key name</th>
<td>description</td>
<td>example</td></tr>

<tr><th>name</th>
<td>name of the transcript</td>
<td>uc011msz.1</td></tr>

<tr><th>chrom</th>
<td>chromosome name</td>
<td>chr11</td></tr>

<tr><th>strand</th>
<td>strand of the transcript (+/-)</td>
<td>+</td></tr>

<tr><th>isMinus</th>
<td>if strand is minus (boolean)</td>
<td>false</td></tr>

<tr><th>txStart</th>
<td>transcription start position (0-based coordinate system)</td>
<td>12345880</td></tr>

<tr><th>txEnd</th>
<td>transcription end position (0-based coordinate system)</td>
<td>12346880</td></tr>

<tr><th>cdsStart</th>
<td>coding region start position (0-based coordinate system)</td>
<td>12345880</td></tr>

<tr><th>cdsEnd</th>
<td>coding region end position (0-based coordinate system)</td>
<td>12346880</td></tr>

<tr><th>proteinID</th>
<td>protein ID</td>
<td>B7ZGX9</td></tr>

<tr><th>exons</th>
<td>list of exons order by exon num. (0-based coordinate)</td>
<td>[{chr: xxx, start: xxx, end: xxx, strand: xxx}, ...]</td></tr>

<tr><th>gene</th>
<td>gene name</td>
<td>ALG13</td></tr>

<tr><th>refseqId</th>
<td>refseq ID</td>
<td>NM_033487</td></tr>

</table>

### txr.getSeq(name, fr, options) ###
Gets sequences of given **name**.

**name** is a UCSC transcript.

**fr** is a instance of [fastareader](https://github.com/shinout/FASTAReader).

**options** is as follows.

<table>
<tr><th>key name</th>
<td>description</td>
<td>default</td>
<td>example</td></tr>

<tr><th>startExon</th>
<td>start exon number</td>
<td>1</td>
<td>2</td></tr>

<tr><th>startBase</th>
<td>start base in the start exon(0-based coordinate)</td>
<td>0</td>
<td>21</td></tr>

<tr><th>endExon</th>
<td>end exon number</td>
<td>(exons.length)</td>
<td>4</td></tr>

<tr><th>endBase</th>
<td>end base in the end exon(0-based coordinate)</td>
<td>(exon length of the endExon)</td>
<td>300</td></tr>

</table>

### txr.getNames() ###
Gets a list of all transcripts.


### txr.getTxsByExon(formattedExon) ###
Gets a hash of transcript which has the given exon.

**formattedExon** is compatible with [dna library](https://github.com/shinout/dna)

    chr2:34100214-34101989,-

Returns a hash whose keys are UCSC transcript id and values are the exon number.

### txr.getTxsByGene(geneName) ###
Gets a list of UCSC transcripts whose gene name is **geneName**.

**geneName** must be compatible with one written in **options.xref** file.


### txr.getTxsByRefSeqId(refseqId) ###
Gets a list of UCSC transcripts whose gene name is **geneName**.

**refseqId** must be compatible with one written in **options.xref** file.

### TxReader.parseLine(line) ###
(static) Parses a line from UCSC knownGene file.
Returns information object (written in **txr.getInfo()**).
