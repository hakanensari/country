docker run \
  -d \
  -p 3000:3000 \
  -e ACCOUNT_ID=YOUR_MAXMIND_ACCOUNT_ID \
  -e LICENSE_KEY=YOUR_MAXMIND_LICENSE_KEY \
  hakanensari/country
