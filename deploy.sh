#! /bin/bash

cwd=$(pwd)
tmpdir=$(mktemp -d)
node011dir=$(mktemp -d)

git clone https://github.com/phanect/ComicAlert.git $tmpdir
git clone https://github.com/phanect/nodejs-custom-version-openshift.git $node011dir

if [ "$1" = "--secrets" ]; then
	secret="$2"
	cp $secret "$tmpdir/config/secrets.json"
elif [ -f "config/secrets.json" ]; then
	cp "config/secrets.json" "$tmpdir/config/secrets.json"
else
	echo "Specify config/secrets.json by --secrets option.\n"
	exit
fi

cd $tmpdir

git add --force config/secrets.json

mv "$node011dir/.openshift" $tmpdir
rm -rf $node011dir
git add .openshift

git remote set-url origin ssh://53c14fcde0b8cd7003000649@comicalert-comicalert.rhcloud.com/~/git/comicalert.git/

jake build
git add --force _build
git add --force public/js/core
git add --force public/css/style.css

git commit -m "Deployment at $(date)"
git push --force

cd $cwd

#rm -rf $tmpdir
