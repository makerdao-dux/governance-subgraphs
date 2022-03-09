# MakerDAO Governance Subgraphs

WIP

## Regenerate code files:

TheGraph uses the `./src/mapping.ts` to generate code files, if you modify the mappings, make sure to run:

```
yarn codegen
```


## Running locally

We need to run a local graph node:

```
 git clone https://github.com/graphprotocol/graph-node
 cd graph-node/docker/
 ./setup.sh
 docker-compose up
```
You will need to edit the `docker-compose.yaml` file to point to goerli, make sure the ethereum network points to your RPC:

```
    ethereum: 'goerli:https://eth-goerli.alchemyapi.io/v2/xxxxxxx'
```

more info at: https://thegraph.academy/developers/local-development/


Once the graph node is working, we need to start our server we will run:

```
yarn create-local

```