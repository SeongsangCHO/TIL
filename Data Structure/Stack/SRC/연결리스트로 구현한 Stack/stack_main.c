/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   stack_main.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 21:35:06 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:48:26 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <stdlib.h>

typedef struct s_node
{
	int data;
	struct s_node *next;
}				t_node;

typedef struct	s_stack
{
	int size;
	struct s_node *top;
}				t_stack;

t_stack		*initStack()
{
	t_stack *new;

	if (!(new = malloc(sizeof(t_stack))))
		return (NULL);
	new->size = 0;
	new->top = NULL;
	return (new);
}

t_node		*create_node(int data)
{
	t_node *new;

	if (!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->next = NULL;
	return (new);
}

void		push(t_stack *stack, int data)
{
	t_node *new;

	if (stack == NULL || (!(new = create_node(data))))
		return ;
	new->next = stack->top;
	stack->top = new;
	stack->size++;
	return ;
}

void		pop(t_stack *stack)
{
	t_node *prev;

	if (stack == NULL || stack->size == 0 || stack->top == NULL)
		return ;
	prev = stack->top;
	stack->top = prev->next;
	free(prev);
	stack->size--;
}

void		clear(t_stack *stack)
{

	if (stack == NULL || stack->top == NULL)
		return ;
	while (stack->top)
		pop(stack);
	free(stack);
	return ;
}

int main(void)
{
	t_stack *stack;

	stack = initStack();
	push(stack, 3);
	pop(stack);
	clear(stack);
}
