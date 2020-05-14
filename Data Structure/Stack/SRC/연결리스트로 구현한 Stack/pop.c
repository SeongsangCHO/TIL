/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pop.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:45:50 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:32:25 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

void	pop(t_stack *stack)
{
	t_node *prev;

	if (stack == NULL || stack->size == 0 || stack->top == NULL)
	{
		printf("stack is empty.\n");
		return ;
	}
	prev = stack->top;
	printf("[%d] is pop.\n",stack->top->data);
	stack->top = stack->top->next;
	prev->next = NULL;
	free(prev);
	stack->size--;
}
