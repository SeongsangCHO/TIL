/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   push.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:23:28 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 20:42:24 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

void		push(t_stack *stack, int data)
{
	t_node *new;

	if (!(new = create_node(data)))
		return ;
	new->next = stack->top;
	stack->top = new;
	stack->size++;
	return ;
}
