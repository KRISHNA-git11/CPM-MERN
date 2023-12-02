// import React, { useMemo } from 'react';
// import { Viewer } from 'react-pdf-viewer/core';
// import { defaultLayoutPlugin } from 'react-pdf-viewer/default-layout';

// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const PdfViewer = () => {
//     const defaultLayoutPluginInstance = useMemo(() => defaultLayoutPlugin(), []);

//     return (
//         <Viewer
//             fileUrl='/assets/Chewy CL.pdf'
//             plugins={[
//                 // Register plugins
//                 defaultLayoutPluginInstance,
//                 // ... other plugins
//             ]}
//         />
//     );
// };

// export default PdfViewer;


import React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';




const PdfViewer = ({documentPath}) => {
    return (
        <div className='control-section'>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent
                id="container"
                documentPath={documentPath}
                resourceUrl="https://cdn.syncfusion.com/ej2/23.1.40/dist/ej2-pdfviewer-lib"
                style={{ 'height': '640px' }}>

                <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />

            </PdfViewerComponent>
        </div>
    );
};

export default PdfViewer;
