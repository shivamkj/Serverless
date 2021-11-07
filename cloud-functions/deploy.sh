echo "Functions deployment Started"

cd create
gcloud functions deploy "crud-test-create" \
    --runtime=nodejs14 \
    --trigger-http \
    --entry-point=function \
    --region=asia-south1 \
    --allow-unauthenticated \
    --memory=128MB
cd ..

cd read
gcloud functions deploy "crud-test-read" \
    --runtime=nodejs14 \
    --trigger-http \
    --entry-point=function \
    --region=asia-south1 \
    --allow-unauthenticated \
    --memory=128MB
cd ..

cd update
gcloud functions deploy "crud-test-update" \
    --runtime=nodejs14 \
    --trigger-http \
    --entry-point=function \
    --region=asia-south1 \
    --allow-unauthenticated \
    --memory=128MB
cd ..

cd delete
gcloud functions deploy "crud-test-delete" \
    --runtime=nodejs14 \
    --trigger-http \
    --entry-point=function \
    --region=asia-south1 \
    --allow-unauthenticated \
    --memory=128MB
cd ..


echo "Functions deployment Finished"