import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import i18next from 'i18next';
import Placeholder from './placeholder';
import store from '../store';
import { retrieveImageInfo, retrieveLogoInfo, retrieveProfilePicInfo, retrieveDocumentInfo } from '../actions';

const renderDropzoneField = function({
  input,
  name,
  imagefile,
  btnText,
  cvBtnLabel,
  isLogo,
  isImage,
  isProfilePic,
  isCV,
  CV,
  uploadedDocument,
  meta: { touched, error },
}) {
  return (
    <div>
      <Dropzone
        multiple
        name={name}
        accept={!isCV ? 'image/png,image/jpg,image/jpeg' : '.doc,.docx,.pdf'}
        onDrop={filesToUpload => {
          const file = filesToUpload[0];
          if (!!file) {
            if (isImage) {
              if (file.size > 2210000) {
                alert(i18next.t('dropzone:fileMaxSizeMsg'));
                return;
              } else {
                store.dispatch(retrieveImageInfo(file));
              }
            } else if (isLogo) {
              if (file.size > 2210000) {
                alert(i18next.t('dropzone:fileMaxSizeMsg'));
                return;
              } else {
                store.dispatch(retrieveLogoInfo(file));
              }
            } else if (isProfilePic) {
              if (file.size > 2210000) {
                alert(i18next.t('dropzone:fileMaxSizeMsg'));
                return;
              } else {
                store.dispatch(retrieveProfilePicInfo(file));
              }
            } else {
              store.dispatch(retrieveDocumentInfo(file));
            }
            const reader = new FileReader();
            reader.onload = event => {
              input.onChange(event.target.result);
            };
            reader.readAsDataURL(file);
          } else {
            alert(!isCV ? i18next.t('dropzone:invalidImage') : i18next.t('dropzone:invalidCV'));
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />

              {isCV ? (
                !uploadedDocument.name ? (
                  <Button variant="outlined">{cvBtnLabel}</Button>
                ) : CV !== '' ? (
                  <div>
                    <Button variant="outlined" style={{ marginRight: 5 }}>
                      {cvBtnLabel}
                    </Button>
                    {uploadedDocument.name}
                  </div>
                ) : (
                  <Button variant="outlined">{cvBtnLabel}</Button>
                )
              ) : (
                <Placeholder
                  error={error}
                  touched={touched}
                  btnText={btnText}
                  imagefile={imagefile}
                  isLogo={isLogo}
                  isImage={isImage}
                  isProfilePic={isProfilePic}
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default connect()(renderDropzoneField);
