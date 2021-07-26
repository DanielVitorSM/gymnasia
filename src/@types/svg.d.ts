declare module "*.svg" {
    import React, { SVGProps } from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SVGProps>;
    export default content;
}