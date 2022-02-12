import { PluginComponent, PluginInputType } from "react-with-native-form";
declare const FileInput: PluginComponent<FileInputType>;
export declare class FileInputType implements PluginInputType {
    type: "file";
    value: File[];
    defaultValue: File[];
    config?: {
        errorClassName?: string;
        extraClassName?: string;
        replaceClassName?: string;
    };
    extra: {
        allowedFileTypes: string[];
    };
}
export default FileInput;
//# sourceMappingURL=FileInput.d.ts.map