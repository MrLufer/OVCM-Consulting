import React from "react";

import { Box, Button } from "grommet";
import { FormClose } from "grommet-icons";
import { FileInfo } from "./FileInfo";

export const File = ({
  file,
  removeFile,
  showPreview,
  showFileSize,
  ...rest
}) => {
  return (
    <Box direction="row" align="center" justify="between" {...rest}>
      <FileInfo
        file={file}
        showFileSize={showFileSize}
        showPreview={showPreview}
      />
      <RemoveButton file={file} removeFile={removeFile} />
    </Box>
  );
};

const RemoveButton = ({ file, removeFile }) => (
  <Button
    a11yTitle={`remove ${file.path}`}
    icon={<FormClose />}
    hoverIndicator
    onClick={() => removeFile(file)}
  />
);

