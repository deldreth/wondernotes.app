<template>
  <section
    v-for="note in sortedNotes"
    :key="note.id"
    class="
      py-3
      px-6
      mx-2
      cursor-pointer
      hover:bg hover:bg-indigo-800
      rounded-sm
      shadow-inner
    "
    :class="`${$route.params.noteId === note.id && 'bg-indigo-900'}`"
    @click="$router.push(`${routePath}/note/${note.id}`)"
  >
    <h2 :title="note.name">
      {{ note.name }}
    </h2>

    <p class="text-sm leading-normal">
      <span class="mr-0.5 text-blue-200">{{
        $filters.formatDate(note.updatedAt)
      }}</span>
      <span v-if="note.body">&ndash;{{ note.excerpt }}</span>
    </p>

    <p
      v-if="!!(tasks = $filters.countTasks(note.body))"
      class="text-sm mt-1"
      :class="tasks[0] === tasks[1] ? 'text-green-300' : 'text-red-400'"
    >
      <FontAwesomeIcon icon="tasks" />&nbsp;{{ tasks[0] }}/{{ tasks[1] }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routePath = route.params.groupId
  ? `/group/${route.params.groupId}`
  : `/tag/${route.params.tagId}`;

const props = defineProps({
  notes: {
    type: Array,
    default: () => {},
  },
});

const sortedNotes = computed({
  get() {
    return props.notes.map(note => {
      note.excerpt = note.body.replace(/<[^>]*>?/gm, ' ').substring(0, 200);
      return note;
    });
  },
});
</script>
