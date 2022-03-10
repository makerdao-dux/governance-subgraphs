import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Polling,
  PollCreated,
  PollWithdrawn,
  Voted
} from "../generated/Polling/Polling"
import { Poll, Vote, Account } from "../generated/schema"

export function handlePollCreated(event: PollCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Poll.load(event.params.pollId.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Poll(event.params.pollId.toString())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // Entity fields can be set based on event parameters
  entity.creator = event.params.creator
  entity.blockCreated = event.params.blockCreated
  entity.pollId = event.params.pollId.toI32()
  entity.multiHash = event.params.multiHash.toString()
  entity.url = event.params.url.toString()
  entity.startDate = event.params.startDate.toString();
  entity.endDate = event.params.endDate.toString();  

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.npoll(...)
}

export function handlePollWithdrawn(event: PollWithdrawn): void {}

export function handleVoted(event: Voted): void {
  const voteEntity = new Vote(event.transaction.hash.toString())

  voteEntity.blockCreated = event.block.number;
  voteEntity.address = event.transaction.from;

  const pollId = event.params.pollId.toI32()
  const votedOption = event.params.optionId.toString();

  voteEntity.pollId = pollId;
  voteEntity.optionId = votedOption;
  // , event.parameters.map(e => e.name + ' ' + e.value.toString()).join(', ')
  log.info('ey {}', [event.address.toString()])

  voteEntity.save()
}
