export const utils = {
    getByteSize: (str: string, byte: number, i: number): number => {
        for (byte = i = 0; i < str.length; ++i) {
            (str.charCodeAt(i) > 127) ? byte += 2 : byte++;
        }

        return byte;
    },

    getTogglePopup(name: string, elm: any): void {
        if (name === 'isPrivate') {
          elm.classList.toggle('on');
        }
    },

    getFileFromBlob(blob: Blob, name: string): File {
        blob['lastModifiedDate'] = new Date();
        blob['name'] = name;

        return <File>blob;
    }
};
