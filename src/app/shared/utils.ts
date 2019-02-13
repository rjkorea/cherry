export const utils = {
    getByteSize: (str: string, byte: number, i: number): number => {
        for (byte = i = 0; i < str.length; ++i) {
            (str.charCodeAt(i) > 127) ? byte += 2 : byte++;
        }

        return byte;
    },

    getTogglePopup(name: string, elm: any): void {
        if (name === 'isPublic') {
          elm.classList.toggle('on');
        }
    }
};
